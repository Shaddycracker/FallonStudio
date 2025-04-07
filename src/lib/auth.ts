import { jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"
import type { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key-change-this-in-production"
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "24h"
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"

// Convert JWT expiration time to seconds
const getExpirationTime = (expiresIn: string): number => {
  const match = expiresIn.match(/(\d+)([hms])/)
  if (!match) return 60 * 60 // Default to 1 hour

  const [, value, unit] = match
  const numValue = Number.parseInt(value, 10)

  switch (unit) {
    case "h":
      return numValue * 60 * 60
    case "m":
      return numValue * 60
    case "s":
      return numValue
    default:
      return 60 * 60
  }
}

// Create a JWT token
export async function createToken(username: string): Promise<string> {
  const expirationTime = getExpirationTime(JWT_EXPIRES_IN)

  const token = await new SignJWT({ username })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + expirationTime)
    .sign(new TextEncoder().encode(JWT_SECRET))

  return token
}

// Verify a JWT token
export async function verifyToken(token: string): Promise<{ username: string } | null> {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))

    return { username: payload.username as string }
  } catch (error) {
     console.error("Token verification error:", error)
    return null
  }
}

// Validate admin credentials
export async function validateCredentials(username: string, password: string): Promise<boolean> {
  if (username !== ADMIN_USERNAME) {
    return false
  }

  // In a real app, you'd fetch the hash from a database
  // For simplicity, we're hashing the password on each validation
  // This is not efficient but works for demo purposes
  const isValid = await bcrypt.compare(password, await bcrypt.hash(ADMIN_PASSWORD, 10))
  return isValid
}

// Get the current user from the request
export async function getCurrentUser(req: NextRequest): Promise<{ username: string } | null> {
  const token = req.cookies.get("token")?.value

  if (!token) {
    return null
  }

  return verifyToken(token)
}

// Set auth cookie
export function setAuthCookie(res: NextResponse, token: string): void {
  res.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: getExpirationTime(JWT_EXPIRES_IN),
  })
}

// Clear auth cookie
export function clearAuthCookie(res: NextResponse): void {
  res.cookies.set({
    name: "token",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  })
}

// Check if user is authenticated (for server components)
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  if (!token) {
    return false
  }

  const user = await verifyToken(token)
  return !!user
}


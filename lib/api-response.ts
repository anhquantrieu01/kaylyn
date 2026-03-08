import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function successResponse(data: any, message = "Success", status = 200) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
}

export function errorResponse(message = "Error", status = 400) {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status }
  );
}
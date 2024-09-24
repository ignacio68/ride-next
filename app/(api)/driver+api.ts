import { neon } from "@neondatabase/serverless";

export async function GET() {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);

    const response = await sql`SELECT * FROM drivers`;

    return Response.json({ data: response }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}

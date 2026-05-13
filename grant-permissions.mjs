import pg from 'pg';
const { Client } = pg;

const client = new Client({
  host: 'supabase-dev.pm-mngdp.xyz',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'PostgreSQL',
  ssl: { rejectUnauthorized: false }
});

try {
  await client.connect();
  console.log('✅ Connected');

  await client.query(`
    CREATE OR REPLACE FUNCTION public.insert_bu_hierarchy(
      p_n1 text, p_n2 text, p_n3 text,
      p_code text, p_bu text, p_id text,
      p_level text, p_emp_no numeric
    )
    RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS
    $$
    BEGIN
      INSERT INTO "TMC"."BUs Hierarchy"
        ("Business units N-1","Business units N-2","Business units N-3","CODE","BU","ID","Level","Emp. No.")
      VALUES (p_n1, p_n2, p_n3, p_code, p_bu, p_id, p_level, p_emp_no);
    END;
    $$;
  `);
  console.log('✅ Function insert_bu_hierarchy created');

  await client.query(`GRANT EXECUTE ON FUNCTION public.insert_bu_hierarchy TO anon, authenticated`);
  console.log('✅ GRANT done');

  await client.end();
  console.log('✅ Done!');
} catch (err) {
  console.error('❌ Error:', err.message);
  process.exit(1);
}

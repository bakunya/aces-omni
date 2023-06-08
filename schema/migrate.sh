#! /bin/sh
echo "START MIGRATION";
npx wrangler d1 execute acesdb --file=./schema/20230523/aces.sql;
npx wrangler d1 execute acesdb --file=./schema/20230523/modules.sql;
npx wrangler d1 execute acesdb --file=./schema/20230523/userdata1.sql;
npx wrangler d1 execute acesdb --file=./schema/20230523/userdata2.sql;
npx wrangler d1 execute acesdb --file=./schema/20230523/userdata3.sql;
npx wrangler d1 execute acesdb --file=./schema/20230523/v202303.sql;
echo "END MIGRATION";
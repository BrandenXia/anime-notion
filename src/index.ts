import create from "@/db/create";
import createClient from "@/client";

const main = async () => {
  const client = createClient();

  await create(client, "37b9a2f2c5814cf982375effe4dbd8d8");
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

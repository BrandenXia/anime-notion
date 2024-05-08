import createBangumiClient from "@/bangumi";

const main = async () => {
  const bangumi = createBangumiClient();
  const a = await bangumi.search({
    pathParam: { keywords: "No game no life" },
    queryParam: { type: 6 },
    reqBody: {},
  });

  console.log(a);
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

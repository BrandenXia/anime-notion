import { notion, bangumi } from "@/clients";
import { NOTION_PAGE_ID } from "@/env";
import { toBangumiStatus } from "@/utils";

import type {
  DatabaseObjectResponse,
  PageObjectResponse,
} from "@notionhq/client";

(async () => {
  const res = await notion.databases.retrieve({
    database_id: NOTION_PAGE_ID,
  });
  if (!Object.hasOwn(res, "title")) return;
  const resSuccess = res as DatabaseObjectResponse;

  const dataSourceId = resSuccess.data_sources[0].id;

  let items = await notion.dataSources.query({
    data_source_id: dataSourceId,
  });

  while (items.has_more) {
    for (const item of items.results) {
      const i = item as PageObjectResponse;
      if (!Object.hasOwn(i, "properties")) continue;
      const properties = i.properties as unknown as {
        Status: { select: { name: string } };
        Type: { select: { name: string } };
        Id: { number: number };
        Name: { title: { plain_text: string }[] };
      };
      try {
        await bangumi.addCollection({
          body: { type: toBangumiStatus(properties.Status.select.name) },
          pathParam: { subject_id: properties.Id.number },
        });
      } catch (e) {
        console.error(
          `Failed to add ${properties.Name.title[0].plain_text} (id: ${properties.Id.number}) to Bangumi`,
        );
      }
    }

    if (items.has_more)
      items = await notion.dataSources.query({
        data_source_id: dataSourceId,
        start_cursor: items.next_cursor ?? undefined,
      });
  }

  console.log("Done");
})();

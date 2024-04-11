import styles from "./layout.module.css";
import DocsHeader from "../../../components/DocsHeader";
import DocsBreadCrumbNav from "../../../components/DocsBreadCrumbNav";
import DocsNavigation from "../../../components/DocsNavigation";
import React from "react";
import { getDocsData, getPageData } from "./doc_data";
import { notFound } from "next/navigation";
import DocsNavigationBackdrop from "../../../components/DocsNavigationBackdrop";

export default async function Layout({ children, params }) {
  const data = await getDocsData();

  let path = "";
  for (let p of params.slug || ["introduction"]) {
    if (p.indexOf(".") !== -1) continue;
    path += "/" + p;
  }
  if (path.endsWith(".js") || path.endsWith(".mdx")) return notFound();

  const headings = [];
  /*
  for (let line of data.body.split("\n")) {
    if (line.startsWith("#")) {
      let [, count, text] = line.match("(#*)s*(.*)");
      if (count.length === 3) headings.push(text);
    }
  }*/
  /*
     <DocsSearchModal />

      <DocsBreadCrumbNav datax={datax} />

 */
  const datax = await getPageData(path);
  for (let group of data.navigation) {
    for (let page of group.pages) {
      if ("/" + page === path) {
        datax.group = group.group;
      }
    }
  }

  return (
    <div className={styles.container} id="container">
      <DocsNavigationBackdrop>
        <DocsHeader />
        <DocsBreadCrumbNav datax={datax} />

        <div className={styles.main_container}>
          <DocsNavigation data={data} path={path} />
          <div className={styles.main}>{children}</div>
          <div className={styles.toc2}>
            <div className={styles.toc2_inner}>
              {headings.map((h, i) => (
                <p key={i}>
                  <a href={"#" + save_tag(h)}>{h}</a>
                </p>
              ))}
            </div>
          </div>
        </div>
      </DocsNavigationBackdrop>
    </div>
  );
}

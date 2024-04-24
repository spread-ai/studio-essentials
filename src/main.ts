import Config from "./config";

/** A simple test function that returns the passed argument. */
export function dummyFunction(parameter: string) {
  return parameter;
}

/**
 * Get all nodes from a ESF object
 */
export function getAllNodes(obj) {
  const ids = [];

  function traverse(obj) {
    if (obj.hasOwnProperty("id")) {
      let shortName = obj.name?.de || obj.shortName || obj.id;

      let idConcept = "";

      if (
        obj?.externalIds?.filter((obj) => obj.context.includes("INTERNAL_TYPE"))
          .length > 0
      ) {
        idConcept = obj?.externalIds?.filter((obj) =>
          obj.context.includes("INTERNAL_TYPE")
        )[0]?.aliases[0];
        console.log(idConcept);
      } else {
        idConcept =
          obj.id.split("/").length > 1 ? obj.id.split("/")[0] : undefined;
      }

      let node = { id: obj.id, label: shortName };
      const color = Config.colorConf
        ? Config.colorConf.find((e) => idConcept === e.concept)?.color || "red"
        : "red";
      node["color"] = color;

      ids.push(node);
    }

    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        traverse(obj[key]);
      }
    }
  }

  traverse(obj);
  const nodes = Array.from(new Set(ids.map((obj) => obj.id))).map((id) => {
    return ids.find((obj) => obj.id === id);
  });
  return nodes;
}

export function getAllEdges(obj) {
  const edges = [];
  let edgeId = 1;

  function traverse(obj, parent = null) {
    if (obj.hasOwnProperty("id")) {
      if (parent) {
        edges.push({ id: edgeId++, from: parent.id, to: obj.id });
      }
      parent = obj;
    }

    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        traverse(obj[key], parent);
      }
    }
  }

  traverse(obj);
  return edges;
}

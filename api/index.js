import { faker } from "@faker-js/faker";

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newSummary = () => {
  return {
    type: "summary",
    id: faker.datatype.uuid(),
    title: faker.lorem.sentence(),
    thumbnail: "https://picsum.photos/150/100",
    lastViewed: faker.date.recent(100),
    viewCount: faker.datatype.number(),
    videoLength: faker.datatype.number({ max: 30, min: 2 }),
  };
};

const newFolder = () => {
  return {
    type: "folder",
    id: faker.datatype.uuid(),
    title: faker.lorem.sentence(),
    lastViewed: faker.date.recent(100),
    videoCount: faker.datatype.number(100),
  };
};

const makeSummaryData = (...lens) => {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map(() => {
      if (Math.random() > 0.8) {
        return {
          ...newFolder(),
          subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
        };
      } else {
        return {
          ...newSummary(),
          subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
        };
      }
    });
  };

  return makeDataLevel();
};

const makeExploreData = (...lens) => {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map(() => {
      return {
        ...newSummary(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
};

const summaryData = makeSummaryData(100);
const exploreData = makeExploreData(8);

export const fetchSummaryData = async options => {
  await new Promise(r => setTimeout(r, 500));

  return {
    rows: summaryData.slice(
      options.pageIndex * options.pageSize,
      (options.pageIndex + 1) * options.pageSize
    ),
    pageCount: Math.ceil(summaryData.length / options.pageSize),
  };
};

export const fetchExploreData = async options => {
  await new Promise(r => setTimeout(r, 500));

  return {
    rows: exploreData.slice(
      options.pageIndex * options.pageSize,
      (options.pageIndex + 1) * options.pageSize
    ),
    pageCount: Math.ceil(exploreData.length / options.pageSize),
  };
};

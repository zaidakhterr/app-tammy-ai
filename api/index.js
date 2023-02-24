import { faker } from "@faker-js/faker";

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newSummary = () => {
  const channel = faker.lorem.word();
  return {
    type: "summary",
    id: faker.datatype.uuid(),
    title: faker.lorem.sentence(),
    channel: channel,
    thumbnail: `https://picsum.photos/seed/${channel}/150/100`,
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

const summaryData = makeSummaryData(100);

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

const exploreData = makeExploreData(80);

export const fetchExploreData = async options => {
  await new Promise(r => setTimeout(r, 2000));

  const pageSize = 10;
  const pageIndex = options.pageParam ?? 0;

  return {
    rows: exploreData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
    pageCount: Math.ceil(exploreData.length / pageSize),
  };
};

const makeSubpoints = () => {
  const p = [];
  for (let i = 0; i < 500; i++) {
    p.push(faker.lorem.sentences());
  }

  return p;
};

const subpoints = makeSubpoints();

const newSummaryPoint = () => {
  return {
    id: faker.datatype.uuid(),
    emoji: faker.helpers.arrayElement(["🎊", "🔥", "✅", "ℹ️", "♥️", "💔"]),
    description: faker.lorem.sentences(),
    subPoints: faker.helpers.arrayElements(subpoints, 5),
    timestamp: faker.datatype.number({ max: 30, min: 2 }),
  };
};

const makeSummaryPoints = () => {
  const p = [];
  for (let i = 0; i < 100; i++) {
    p.push(newSummaryPoint());
  }

  return p;
};

const points = makeSummaryPoints();

const newSummaryDetail = id => {
  return {
    id,
    video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    description: faker.lorem.sentences(),
    language: faker.helpers.arrayElement(["English", "Spanish", "French"]),
    points: faker.helpers.arrayElements(points, 10),
  };
};

export const fetchSummaryDetail = async id => {
  await new Promise(r => setTimeout(r, 500));
  return newSummaryDetail(id);
};

const makeSummaries = () => {
  const p = [];
  for (let i = 0; i < 50; i++) {
    p.push(newSummary());
  }

  return p;
};

const summaries = makeSummaries();

const newFolderDetail = id => {
  return {
    id,
    title: faker.lorem.sentence(),
    summaries: faker.helpers.arrayElements(summaries),
  };
};

export const fetchFolderDetail = async id => {
  await new Promise(r => setTimeout(r, 500));
  return newFolderDetail(id);
};

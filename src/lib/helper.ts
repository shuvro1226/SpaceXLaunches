export const setQueryParams = (
  status: string,
  page: number,
  searchText: string
) => {
  let queryParams: object = {};
  switch (status) {
    case "success":
      queryParams = {
        success: true,
      };
      break;
    case "failed":
      queryParams = {
        success: false,
      };
      break;
    case "upcoming":
      queryParams = {
        upcoming: true,
      };
      break;
    default:
      break;
  }

  if (searchText) {
    const searchQuery = {
      $text: {
        $search: searchText,
      },
    };
    queryParams = {
      ...queryParams,
      ...searchQuery,
    };
  }

  const params = JSON.stringify({
    query: {
      ...queryParams,
    },
    options: {
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
      ],
      select: {
        links: 1,
        details: 1,
        success: 1,
        rocket: 1,
        name: 1,
        upcoming: 1,
        date_utc: 1
      },
      page: page,
      limit: 12,
    },
  });

  return params;
};

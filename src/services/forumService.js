import { getCurrentUser } from "./authService.js";

export async function fetchForumById(forumId) {
  const response = await fetch(
    `https://unirate.kz/university/open-api/forums/${forumId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch forum data");
  }
  return await response.json();
}

export async function getAllForum() {
  const response = await fetch(
    'https://unirate.kz/university/open-api/forums '
  );
  if (!response.ok) {
    throw new Error("Failed to fetch forum data");
  }
  return await response.json();

}

export async function getAllReviews({ page = 0, size = 10, sort = ["createdAt,desc"] } = {}) {
  const response = await fetch("https://unirate.kz/university/open-api/review", {
    method: "GET",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch reviews. Server responded: ${errorText}`);
  }

  return await response.json();
}

export async function postComment({ forumId, userId, comment }) {
  const requestBody = {
    forumId,
    userId,
    comment,
    rating: 0,
  };

  const currentUser = await getCurrentUser();

  if (!currentUser || !currentUser.token) {
    throw new Error("User is not authenticated");
  }
  //const response = await fetch("https://unirate.kz/university/api/reviews", {
  const response = await fetch(
    "https://unirate.kz/university/api/admin/review",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.token}`,
      },
      body: JSON.stringify(requestBody),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to post comment. Server responded: ${errorText}`);
  }

  const result = await response.json();
  result.profileImgUrl = currentUser.profileImgUrl;
  return result;
}

export async function replyToComment(reviewId, userId, comment) {
  const currentUser = await getCurrentUser();

  if (!currentUser || !currentUser.token) {
    throw new Error("User is not authenticated");
  }

  const requestBody = {
    userId,
    comment,
  };
  // const response = await fetch(`https://unirate.kz/university/api/reviews/${reviewId}/comments`, {
  const response = await fetch(
    `https://unirate.kz/university/api/admin/review/${reviewId}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.token}`,
      },
      body: JSON.stringify(requestBody),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to post reply. Server responded: ${errorText}`);
  }

  return await response.json();
}

export async function fetchForumReviews(forumId, page, size, sort) {
  const response = await fetch(
    `https://unirate.kz/university/open-api/review/forum/${forumId}?page=${page}&size=${size}&sort=${sort}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to fetch forum reviews. Server responded: ${errorText}`
    );
  }

  return await response.json();
}

export async function searchForums(universityName, name) {
  const queryParams = new URLSearchParams();
  if (universityName) queryParams.append("universityName", universityName);
  if (name) queryParams.append("name", name);

  const response = await fetch(
    `https://unirate.kz/university/open-api/forums/search?${queryParams.toString()}`,
    {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to search forums. Server responded: ${errorText}`);
  }

  return await response.json();
}

export async function fetchByUniID(universityId) {
  const response = await fetch(
    `https://unirate.kz/university/open-api/review/university/${universityId}/reviews`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch reviews: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

export async function getStatisticOfForum(forumId) {
  const response = await fetch(
    `https://unirate.kz/university/open-api/review/university/${forumId}/stats`
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch forum statistics: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

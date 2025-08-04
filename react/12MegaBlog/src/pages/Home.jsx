import React, { useEffect, useState } from "react";
import databaseService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux"; // Import useSelector to get auth status
import { Link } from "react-router-dom"; // Import Link for navigation

function Home() {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true); // New state to manage loading
  const authStatus = useSelector((state) => state.auth.status); // Get current authentication status

  useEffect(() => {
    // Only attempt to fetch posts if the user is authenticated,
    // OR if you explicitly want guest users to see posts (and have configured Appwrite permissions accordingly).
    if (authStatus) { // If user is logged in, try to fetch posts
      databaseService
        .allPosts()
        .then((posts) => {
          if (posts) {
            setPosts(posts.documents);
          }
        })
        .finally(() => setLoadingPosts(false)); // Set loading to false after fetch attempt
    } else {
      // If not authenticated, no need to fetch. Immediately set loading to false.
      setLoadingPosts(false);
    }
  }, [authStatus]); // Rerun effect if authStatus changes

  // --- Conditional Rendering based on authStatus ---

  if (loadingPosts) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <p className="text-2xl font-bold">Loading posts...</p>
        </Container>
      </div>
    );
  }

  // If user is NOT authenticated, show explicit login/signup options
  if (!authStatus) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold">
                Welcome to the Blog! Please{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Login
                </Link>{" "}
                or{" "}
                <Link to="/signup" className="text-blue-600 hover:underline">
                  Sign Up
                </Link>{" "}
                to view posts and create your own.
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // If user IS authenticated but no posts are found
  if (posts.length === 0 && authStatus) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold">
                No posts found. Be the first to{" "}
                <Link to="/add-post" className="text-blue-600 hover:underline">
                  add a post
                </Link>
                !
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // If user IS authenticated and posts exist, display them
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
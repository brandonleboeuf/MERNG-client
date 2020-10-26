import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Transition } from 'semantic-ui-react';

import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { AuthContext } from '../context/auth';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  useEffect(() => {
    if (data) {
      setPosts(data.getPosts);
    }
  }, [data]);

  return (
    <Grid stackable columns={3}>
      <Grid.Row
        className="page-title"
        style={{
          display: 'block',
          justifyContent: 'center',
          textAlign: 'center',
          fontSize: '2rem',
          marginTop: '10px',
        }}
      >
        <h1>Recent Posts</h1>
      </Grid.Row>
      {user && (
        <Grid.Column>
          <PostForm />
        </Grid.Column>
      )}
      {loading ? (
        <h1>Loading posts...</h1>
      ) : (
        <Transition.Group>
          {data &&
            posts.map((post) => (
              <Grid.Column key={post.id}>
                <PostCard post={post} />
              </Grid.Column>
            ))}
        </Transition.Group>
      )}
    </Grid>
  );
}

export default Home;

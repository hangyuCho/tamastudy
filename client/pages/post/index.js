import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getPostListRequestAction } from '../../store/actions/post/getPostList.action';
import { AppLoading, PageLayoutWithNav } from '../../components/layouts';
import wrapper from '../../store/configureStore';
import { loadMeRequestAction } from '../../store/actions/user/loadme.action';
import setDefaultCookie from '../../utils/setDefaultCookie';
import { PostCard, PostListButtons } from '../../components/organisms';
import PostSearchForm from '../../components/forms/PostSearchForm';
import { getMorePostListRequestAction } from '../../store/actions/post/getMorePostList.action';
import { getCategoryListRequestAction } from '../../store/actions/category/getCategoryList.action';

const PostList = () => {
  const { me } = useSelector((state) => state.userReducer);
  const { postList, pageInfo, getMorePostListLoading } = useSelector(
    (state) => state.postReducer
  );
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState({});

  const fetchData = useCallback(() => {
    if (!getMorePostListLoading && pageInfo.hasNextPage) {
      setTimeout(() => {
        dispatch(getMorePostListRequestAction(searchQuery));
      }, 1000);
    }
  }, [getMorePostListLoading, pageInfo, searchQuery]);

  useEffect(() => {
    if (!getMorePostListLoading && pageInfo.hasNextPage) {
      setSearchQuery({
        ...searchQuery,
        cursor: pageInfo.nextPageCursor,
        limit: 5,
      });
    }
  }, [getMorePostListLoading, pageInfo]);

  return (
    <PageLayoutWithNav pageName="All Posts">
      <PostSearchForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {me && <PostListButtons />}
      {postList.length > 0 ? (
        <InfiniteScroll
          dataLength={postList.length} // This is important field to render the next data
          next={fetchData}
          hasMore={pageInfo.hasNextPage}
          loader={<AppLoading />}
        >
          {postList.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </InfiniteScroll>
      ) : (
        <div>포스트가 존재하지 않습니다. </div>
      )}
    </PageLayoutWithNav>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    setDefaultCookie(context);
    context.store.dispatch(loadMeRequestAction());
    context.store.dispatch(getPostListRequestAction());
    context.store.dispatch(getCategoryListRequestAction());
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default PostList;

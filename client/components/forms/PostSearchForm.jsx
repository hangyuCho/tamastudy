import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../atoms';
import { getPostListRequestAction } from '../../store/actions/post/getPostList.action';

const PostSearchForm = ({ searchQuery, setSearchQuery }) => {
  const dispatch = useDispatch();
  const { categoryList } = useSelector((state) => state.categoryReducer);
  const { register, handleSubmit, errors, formState, reset } = useForm({});

  // 포스트 작성/수정 버튼
  const onSubmit = useCallback(
    (data) => {
      setSearchQuery({
        title: data.title,
        CategoryId: data.CategoryId === 'all' ? null : data.CategoryId,
      });
      dispatch(
        getPostListRequestAction({
          title: data.title,
          CategoryId: data.CategoryId === 'all' ? null : data.CategoryId,
        })
      );
    },
    [searchQuery]
  );

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <select name="CategoryId" ref={register}>
          <option>all</option>
          {categoryList.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <Input>
          <input name="title" placeholder="Title 검색" ref={register()} />
        </Input>
      </form>
    </div>
  );
};

PostSearchForm.propTypes = {
  searchQuery: PropTypes.object.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

export default PostSearchForm;

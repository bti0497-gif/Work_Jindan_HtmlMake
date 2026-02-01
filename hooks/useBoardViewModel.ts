
import { useState, useMemo, useCallback } from 'react';
import { BoardPost } from '../types';
import { BoardRequestParams } from '../services/apiContract';

export const useBoardViewModel = (initialPosts: BoardPost[]) => {
  const [posts, setPosts] = useState<BoardPost[]>(initialPosts);
  const [viewMode, setViewMode] = useState<'list' | 'detail' | 'form'>('list');
  const [selectedPost, setSelectedPost] = useState<BoardPost | null>(null);
  const [editingPost, setEditingPost] = useState<BoardPost | null>(null);
  
  // 조회 조건 관리
  const [queryParams, setQueryParams] = useState<BoardRequestParams>({
    page: 1,
    limit: 10,
    sortBy: 'latest'
  });

  // 검색 및 정렬 로직
  const filteredAndSortedPosts = useMemo(() => {
    let result = [...posts];

    if (queryParams.keyword) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(queryParams.keyword!.toLowerCase()) ||
        p.content.toLowerCase().includes(queryParams.keyword!.toLowerCase())
      );
    }

    result.sort((a, b) => {
      if (queryParams.sortBy === 'views') return b.views - a.views;
      if (queryParams.sortBy === 'oldest') return a.id.localeCompare(b.id);
      return b.id.localeCompare(a.id); // latest default
    });

    return result;
  }, [posts, queryParams]);

  const actions = {
    setSearch: (keyword: string) => setQueryParams(prev => ({ ...prev, keyword, page: 1 })),
    setSort: (sortBy: BoardRequestParams['sortBy']) => setQueryParams(prev => ({ ...prev, sortBy })),
    setPage: (page: number) => setQueryParams(prev => ({ ...prev, page })),
    
    addPost: (post: BoardPost) => setPosts(prev => [post, ...prev]),
    updatePost: (updated: BoardPost) => setPosts(prev => prev.map(p => p.id === updated.id ? updated : p)),
    deletePost: (id: string) => setPosts(prev => prev.filter(p => p.id !== id)),

    /**
     * [SYNC PROTOCOL] 외부 동기화 데이터를 로컬 포스트 목록에 병합
     */
    syncPosts: (externalPosts: BoardPost[]) => {
      setPosts(prev => {
        const postMap = new Map(prev.map(p => [p.id, p]));
        externalPosts.forEach(p => postMap.set(p.id, p));
        return Array.from(postMap.values());
      });
    },

    openDetail: (post: BoardPost) => {
      setSelectedPost(post);
      setViewMode('detail');
    },

    openForm: (post?: BoardPost) => {
      setEditingPost(post || null);
      setViewMode('form');
    },

    backToList: () => {
      setViewMode('list');
      setSelectedPost(null);
      setEditingPost(null);
    }
  };

  return {
    posts: filteredAndSortedPosts,
    viewMode,
    selectedPost,
    editingPost,
    queryParams,
    actions
  };
};

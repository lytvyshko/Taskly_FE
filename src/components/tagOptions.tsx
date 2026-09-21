import type { ReactNode } from 'react';
import {
  BookmarkBorderOutlined,
  BusinessCenter,
  FavoriteBorderOutlined,
  FlagOutlined,
  FolderOutlined,
  GroupOutlined,
  HomeOutlined,
  LabelOutlined,
  ListAltOutlined,
  PersonOutlineOutlined,
  SellOutlined,
} from '@mui/icons-material';

export const tagIcons: Record<string, ReactNode> = {
  bookmark: <BookmarkBorderOutlined />,
  flag: <FlagOutlined />,
  folder: <FolderOutlined />,
  group: <GroupOutlined />,
  heart: <FavoriteBorderOutlined />,
  home: <HomeOutlined />,
  label: <LabelOutlined />,
  list: <ListAltOutlined />,
  person: <PersonOutlineOutlined />,
  tag: <SellOutlined />,
  work: <BusinessCenter />,
};

export const tagColors: Record<
  string,
  { background: string; foreground: string }
> = {
  purple: { background: '#F0E9FF', foreground: '#6A35D9' },
  blue: { background: '#E7F0FF', foreground: '#2F80ED' },
  green: { background: '#C6F0CC', foreground: '#189431' },
  orange: { background: '#FFF0E1', foreground: '#FF8A2B' },
  red: { background: '#FFE7EA', foreground: '#F45D66' },
  grey: { background: '#EEF0F6', foreground: '#8B93A7' },
  teal: { background: '#E2F7F8', foreground: '#10AAB3' },
};

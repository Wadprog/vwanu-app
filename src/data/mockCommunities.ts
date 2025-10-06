/**
 * Mock Community Data for Timeline UI Development
 * This data will be replaced with actual API calls in the future
 */

export interface Member {
  role: string
}
export interface MockCommunityInterface {
  id: number
  name: string
  backgroundImage: string
  interests: Array<{
    id: number
    name: string
  }>
  memberCount?: number
  isCreateCard?: boolean
  createdAt: string
  isMember?: Member
}

export const mockCommunities: MockCommunityInterface[] = [
  {
    id: 0,
    name: 'Create Your own Community',
    backgroundImage:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
    interests: [],
    isCreateCard: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 1,
    name: 'Haiti Land of Liberty',
    backgroundImage:
      'https://images.unsplash.com/photo-1544467845-60b85f3f0858?w=400&h=300&fit=crop',
    interests: [
      { id: 1, name: 'Culture' },
      { id: 2, name: 'History' },
      { id: 390, name: 'History' },
    ],
    memberCount: 1247,
    createdAt: '2024-01-15T10:30:00Z',
    isMember: { role: 'Admin' },
  },
  {
    id: 2,
    name: 'Tech Innovators',
    backgroundImage:
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
    interests: [
      { id: 3, name: 'Tech' },
      { id: 4, name: 'AI' },
    ],
    memberCount: 892,
    createdAt: '2024-02-01T14:20:00Z',
    isMember: { role: 'Admin' },
  },
  {
    id: 3,
    name: 'Caribbean Vibes',
    backgroundImage:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    interests: [
      { id: 5, name: 'Music' },
      { id: 6, name: 'Dance' },
    ],
    memberCount: 2156,
    createdAt: '2024-01-20T09:15:00Z',
  },
  {
    id: 4,
    name: 'Food Lovers United',
    backgroundImage:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
    interests: [
      { id: 7, name: 'Food' },
      { id: 8, name: 'Cooking' },
    ],
    memberCount: 3421,
    createdAt: '2024-01-10T16:45:00Z',
  },
  {
    id: 5,
    name: 'Art & Creativity Hub',
    backgroundImage:
      'https://images.unsplash.com/photo-1561998338-13ad7883b20f?w=400&h=300&fit=crop',
    interests: [
      { id: 9, name: 'Art' },
      { id: 10, name: 'Design' },
    ],
    memberCount: 756,
    createdAt: '2024-02-05T11:30:00Z',
  },
  {
    id: 6,
    name: 'Fitness Enthusiasts',
    backgroundImage:
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    interests: [
      { id: 11, name: 'Fitness' },
      { id: 12, name: 'Health' },
    ],
    memberCount: 1834,
    createdAt: '2024-01-25T08:00:00Z',
  },
]

export default mockCommunities

import img1 from '../assets/portfolio/portfolio-01.png';
import img2 from '../assets/portfolio/portfolio-02.png';
import img3 from '../assets/portfolio/portfolio-03.png';
import img4 from '../assets/portfolio/portfolio-04.png';
import videographyPhoneMan from '../assets/videography-phone-man.png';
import img6 from '../assets/portfolio/portfolio-06.png';

export interface VideographyProject {
  id: string;
  title: string;
  category: "all" | "products-accessories";
  image: string;
  slug: string;
  previewVideo?: string;
  youtubeId?: string;
  objectPosition?: string;
}

const SAMPLE_VIDEO = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4";

export const videographyProjects: VideographyProject[] = [
  {
    id: 'v1',
    title: 'Video 1',
    category: 'products-accessories',
    image: img1,
    slug: 'video-1',
    previewVideo: SAMPLE_VIDEO,
    youtubeId: 'WZXOw5RiEY0'
  },
  {
    id: 'v2',
    title: 'Video 2',
    category: 'all',
    image: img2,
    slug: 'video-2',
    previewVideo: SAMPLE_VIDEO,
    youtubeId: 'otRr88o_KFk'
  },
  {
    id: 'v3',
    title: 'Video 3',
    category: 'products-accessories',
    image: img3,
    slug: 'video-3',
    previewVideo: SAMPLE_VIDEO,
    youtubeId: 'i070ugrDnRI'
  },
  {
    id: 'v4',
    title: 'Video 4',
    category: 'products-accessories',
    image: img4,
    slug: 'video-4',
    previewVideo: SAMPLE_VIDEO,
    youtubeId: 'Q4kFP514aNs'
  },
  {
    id: 'v5',
    title: 'Video 5',
    category: 'all',
    image: videographyPhoneMan,
    objectPosition: 'center 15%',
    slug: 'video-5',
    previewVideo: SAMPLE_VIDEO,
    youtubeId: 'bjed70pk4Hw'
  },
  {
    id: 'v6',
    title: 'Video 6',
    category: 'all',
    image: img6,
    slug: 'video-6',
    previewVideo: SAMPLE_VIDEO,
    youtubeId: 'Vo1hljNjXUQ'
  }
];

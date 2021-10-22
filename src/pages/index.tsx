import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface Image {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface GetImageResponse {
  after: string;
  data: Image[];
}

export default function Home(): JSX.Element {
  async function fechImages({ pageParam = null }): Promise<GetImageResponse> {
    const { data } = await api('/api/images', {
      params: {
        after: pageParam,
      },
    });
    return data;
  }
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    fechImages,
    {
      getNextPageParam: lastPage => lastPage?.after || null,
    }
    // TODO AXIOS REQUEST WITH PARAM
    // TODO GET AND RETURN NEXT PAGE PARAM
  );

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    const formatted = data?.pages.flatMap(imageData => {
      return imageData.data.flat();
    });
    return formatted;
  }, [data]);

  // TODO RENDER LOADING SCREEN

  if (isLoading && !isError) {
    return <Loading />;
  }
  // TODO RENDER ERROR SCREEN
  if (!isLoading && isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
        {hasNextPage && (
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            mt="6"
          >
            {isFetchingNextPage ? 'Carrregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}

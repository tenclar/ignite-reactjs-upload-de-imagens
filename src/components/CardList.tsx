/* eslint-disable react/jsx-no-bind */
import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { onOpen, isOpen, onClose } = useDisclosure();

  // TODO MODAL USEDISCLOSURE
  const [curretImageUrl, setCurrentImageUrl] = useState('');

  // TODO SELECTED IMAGE URL STATE

  function handleViewImage(url: string): void {
    onOpen();
    setCurrentImageUrl(url);
  }
  // TODO FUNCTION HANDLE VIEW IMAGE

  return (
    <>
      {/* TODO CARD GRID */}
      <SimpleGrid columns={[1, 2, 3]} spacing="48px">
        {cards.map(card => (
          <Card key={card.id} data={card} viewImage={handleViewImage} />
        ))}
      </SimpleGrid>

      {/* TODO MODALVIEWIMAGE */}

      <ModalViewImage
        isOpen={isOpen}
        imgUrl={curretImageUrl}
        onClose={onClose}
      />
    </>
  );
}

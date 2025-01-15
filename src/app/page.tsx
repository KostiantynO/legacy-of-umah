// src\app\page.tsx
import { Container } from '@/components/Container';
import { PreviewList } from '@/components/PreviewList/PreviewList';

import type { ReactNode } from 'react';

const DecorDragons = () => (
  <div className="mb-5 h-20 bg-[url(/breaker-dragons.webp)] bg-center bg-no-repeat"></div>
);

const MainContentBG = ({ children }: { children: ReactNode }) => (
  <div className="mx-auto w-[764px] flex-grow bg-[url(/content-main.webp)] bg-contain bg-center bg-repeat-y pb-32 pt-12">
    {children}
  </div>
);

const TwoPillarsBG = ({ children }: { children: ReactNode }) => (
  <div className="mx-8 flex-grow bg-[url('/two-pillars.webp')] bg-contain">
    {children}
  </div>
);

const Topic = ({ children }: { children: ReactNode }) => (
  <h1 className="flex min-h-40 items-end justify-center bg-[url('/topic-area.webp')] bg-[length:765px] bg-[bottom_center] bg-no-repeat text-center align-middle text-4xl">
    <span className="pb-[74px]">{children}</span>
  </h1>
);

const HomePage = () => {
  return (
    <TwoPillarsBG>
      <Container className="flex flex-grow flex-col px-0">
        <Topic>Legacy of Umah: Potato Chronicles</Topic>

        <MainContentBG>
          <DecorDragons />
          <PreviewList />
        </MainContentBG>
      </Container>
    </TwoPillarsBG>
  );
};

export default HomePage;

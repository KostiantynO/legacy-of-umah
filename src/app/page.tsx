import { ReadAloud } from '@/components/ReadAloud';

const HomePage = () => {
  const content = 'Hello World';

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="">
        <ReadAloud content={content} />
      </main>
      <footer className="">footer</footer>
    </div>
  );
};

export default HomePage;

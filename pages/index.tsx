import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { QueryClient, useQuery, dehydrate } from "@tanstack/react-query";
import { useState } from "react";
import getPokemon from "../api/getPokemon";
import { useDebouncedCallback } from "use-debounce";
const Home: NextPage = () => {
  const [pokemon, setPokemon] = useState("ditto");
  const { data, isFetching, isLoading } = useQuery(
    ["pokemon", pokemon],
    () => getPokemon(pokemon),
    { enabled: !!pokemon }
  );
  const debounced = useDebouncedCallback(
    // function
    (value) => {
      setPokemon(value);
    },
    // delay in ms
    1000
  );
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <input
          style={{ display: "block" }}
          onChange={(e) => debounced(e.target.value)}
        ></input>
        {data && <pre>{JSON.stringify(data, null, 5)}</pre>}
        {isFetching && <pre>...fetching</pre>}
        {isLoading && !!pokemon && <pre>...loading</pre>}
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["pokemon", "ditto"], () =>
    getPokemon("ditto")
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
export default Home;
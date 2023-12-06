import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import imageLoader from "../../imageLoader";
import { Character, GetCharacterResults } from "../../types";
import { useRouter} from 'next/router'
import { TypeOfExpression } from "typescript";
import Layout from "../../components/Layout";
import {ReactElement} from "react"

function CharacterPage({character} : {
    character: Character
}) {

    const router = useRouter();
    
    return <div key={character.id}>
    <h1> {character.name} </h1>
        
  
        <Image
        loader={imageLoader}
        unoptimized
        src={character.image}
        alt={character.name}
        width="200"
        height="200"
/>
         </div>
}

CharacterPage.getLayout = function getLayout(page: ReactElement) {
return <Layout> {page} </Layout>

}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await fetch(
        `https://rickandmortyapi.com/api/character/${context.query.id}`
    );
    const character = await res.json();

    return {
        props : {
            character
        }
    }
}

export default CharacterPage;
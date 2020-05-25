import React from "react";
import { useQuery, gql } from "@apollo/client";

import Item from "./Item";
import "./styles.css";

const MY_REPOSITORIES_QUERY = gql`
    query myRepositories($number: Int!) {
        viewer {
            repositories(last: $number) {
                nodes {
                    id
                    name
                }
            }
        }
    }
`;

const MyRepositories = () => {
    const { data } = useQuery(MY_REPOSITORIES_QUERY, {
        variables: { number: 5 },
        notifyOnNetworkStatusChange: true
    });

    let content;
    if (data) {
        content = data.viewer.repositories.nodes.map(obj => {
            return <Item name={obj.name} characterId={obj.id} key={obj.id}/>
        })
    }

    return (
        <div className="MyRepositories">
            {content}
        </div>
    )
}

export default MyRepositories;
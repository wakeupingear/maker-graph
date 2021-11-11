import React from 'react';
import { gql, useQuery } from '@apollo/client';


interface Tutorial {
    title: string;
    type: number;
    authorId: string;
}

interface TutorialData {
    tutorials: Tutorial[];
}

interface Author {
    name: string;
}

const GET_TUTORIALS = gql`{
    tutorials{
      title
      type
    }
  }
`;

export default function Node() {
    const { loading, data } = useQuery<TutorialData, Tutorial>(
        GET_TUTORIALS,
        {}
    );
    return (
        <div>
            <h3>Available Inventory</h3>
            {loading ? (
                <p>Loading ...</p>
            ) : (
                <table>
                    <tbody>
                        {data && data.tutorials.map(tutorial => (
                            <tr>
                                <td>{tutorial.title}</td>
                                <td>{tutorial.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
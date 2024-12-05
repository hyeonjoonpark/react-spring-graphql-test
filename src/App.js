// src/App.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import ApolloProviderComponent from './ApolloProvider';
import ErrorBoundary from './ErrorBoundary'; // ErrorBoundary 추가
import './App.css';

// GraphQL 쿼리 정의
const GET_USERS = gql`
  query {
    findAll {
      userId
      email
      phoneNumber
    }
  }
`;

function UserList() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // data.findAll로 수정
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data.findAll.map(user => (
          <li key={user.userId}>
            <div>userId: {user.userId}</div>
            <div>email: {user.email}</div>
            <div>phoneNumber: {user.phoneNumber}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}


function App() {
  return (
    <ApolloProviderComponent>
      <ErrorBoundary>
        <UserList /> {/* UserList 컴포넌트 사용 */}
      </ErrorBoundary>
    </ApolloProviderComponent>
  );
}

export default App;

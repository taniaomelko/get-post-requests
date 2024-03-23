import { useState, useEffect, useCallback } from 'react';
import './Cards.scss';
import { Title } from '../Title/Title';
import { Card } from '../Card/Card';
import { Loader } from '../Loader/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { fetchUsersAction, updateInfo } from '../../redux/actions';
import { IUser } from '../../types/IUser';

export const Cards = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.allUsers);
  const response = useSelector((state: RootState) => state.formInfo.response);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const { count, page, links: {next_url} } = response;

  const fetchUsers = useCallback((URL: string) => {
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        if (next_url !== null) {
          dispatch(fetchUsersAction(data.users));
          dispatch(updateInfo(data));
          setIsLoading(false);
        }
      })
      .catch(error => {
        setIsLoading(false);
        setError(true);
        throw new Error(error);
      });
  }, [dispatch, next_url]);

  useEffect(() => {
    const URL = `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=${count}`;
    fetchUsers(URL);
  }, [count, dispatch, fetchUsers, page]);

  const showMore = () => {
    if (next_url) {
      setIsLoading(true);
      fetchUsers(next_url);
    }
  }

  return (
    <section className="cards">
      <div className="container">
        <Title className="cards__title">
          Working with GET request
        </Title>

        <div className="cards__cards-wrap">
          {users.map((user: IUser) => (
            <Card key={user.id} user={user} />
          ))}
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          next_url && (
            <div className="cards__button-wrap">
              <button className="button button--cta" onClick={showMore}>
                Show more
              </button>
            </div>
          )
        )}

        {error && <div className="cards__error">Failed to load users.</div>}
      </div>
    </section>
  );
}

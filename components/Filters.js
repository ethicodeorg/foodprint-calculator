import React, { useState } from 'react';
import Select from 'react-select';
import { Router } from '../i18n';
import useSWR from 'swr';
import theme from '../styles/theme';
import { FaSearch } from 'react-icons/fa';

const fetcher = (url) => fetch(url).then((r) => r.json());

const Filters = ({ queries }) => {
  const { data, error } = useSWR('/api/users?publicOnly=true', fetcher);
  const userFilterOptions = [{ value: 'all', label: 'All owners' }].concat(
    data?.users.map((user) => {
      return {
        value: user._id,
        label: user.name,
      };
    })
  );
  const [userFilter, setUserFilter] = useState(
    userFilterOptions.find((option) => option?.value === queries.user) || userFilterOptions[0]
  );
  const sortByOptions = [
    { value: 'landUse', label: 'Sort by land use' },
    { value: 'ghgEmissions', label: 'Sort by greenhouse gas emissions' },
    { value: 'waterWithdrawals', label: 'Sort by water withdrawals' },
    { value: 'eutrophyingEmissions', label: 'Sort by eutrophying emissions' },
  ];
  const [sortBy, setSortBy] = useState(
    sortByOptions.find((option) => option.value === queries.sortBy) || sortByOptions[0]
  );
  const [searchTerm, setSearchTerm] = useState(queries.search || '');

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: 20,
      padding: '0 5px',
      backgroundColor: theme.colors.darkBackground,
      color: theme.colors.white,
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: theme.colors.white,
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: theme.colors.darkBackground,
      color: theme.colors.white,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? theme.colors.aqua : theme.colors.darkBackground,
      color: state.isFocused ? theme.colors.darkBackground : theme.colors.white,
    }),
  };

  return (
    <div className="filters">
      <div className="select-container user-select">
        <Select
          value={userFilter}
          placeholder="All owners"
          onChange={(val) => {
            setUserFilter(val);
            Router.push({
              pathname: '/meals',
              query: {
                ...queries,
                user: val.value,
              },
            });
          }}
          options={userFilterOptions}
          styles={customStyles}
          instanceId="user-filter"
        />
      </div>
      <div className="search-container">
        <label htmlFor="search">
          <div className="search-icon">
            <FaSearch />
          </div>
          <input
            id="search"
            type="text"
            name="search"
            placeholder="Search"
            className="search-input"
            value={searchTerm || ''}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              Router.push({
                pathname: '/meals',
                query: {
                  ...queries,
                  search: e.target.value,
                },
              });
            }}
          />
        </label>
      </div>
      <div className="select-container sort-select">
        <Select
          value={sortBy}
          placeholder="Sort by"
          onChange={(val) => {
            setSortBy(val);
            Router.push({
              pathname: '/meals',
              query: {
                ...queries,
                sortBy: val.value,
              },
            });
          }}
          options={sortByOptions}
          styles={customStyles}
          instanceId="sortby"
        />
      </div>

      <style jsx>{`
        .filters {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          margin: 20px;
        }
        .search-container,
        .select-container {
          width: 220px;
          margin: 0 20px 20px;
        }
        .search-container {
          width: 260px;
          margin: 0 0 20px;
        }
        .sort-select {
          margin: 0 20px;
        }
        .search-icon {
          position: absolute;
          color: ${theme.colors.white};
          margin: 12px 0 0 13px;
        }
        label {
          width: 100%;
        }
        input {
          width: calc(100% - 50px);
          padding: 9px 15px 8px 35px;
          border: 1px solid ${theme.colors.white};
          font-family: ${theme.fontFamily.default};
          font-size: 14px;
          background-color: ${theme.colors.darkBackground};
          color: #fff;
          border-radius: 20px;
          outline: none;
        }
        input::placeholder {
          font-family: ${theme.fontFamily.default};
          color: #fff;
        }

        @media only screen and (min-width: ${theme.sizes.mobile}) {
          .filters {
            flex-direction: row;
          }
          .search-container {
            width: 240px;
            margin: 0 20px;
          }
          .select-container {
            width: 180px;
            margin: 0 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Filters;

import React, { useState } from 'react';
import Select from 'react-select';
import Router from 'next/router';
import useSWR from 'swr';
import theme from '../styles/theme';

const fetcher = (url) => fetch(url).then((r) => r.json());

const Filters = ({ query }) => {
  const { data, error } = useSWR('/api/users', fetcher);
  const userFilterOptions = [{ value: 'all', label: 'All users' }].concat(
    data?.users.map((user) => {
      return {
        value: user._id,
        label: user.name,
      };
    })
  );
  const [userFilter, setUserFilter] = useState(
    userFilterOptions.find((option) => option?.value === query.user) || userFilterOptions[0]
  );
  const sortByOptions = [
    { value: 'landUse', label: 'Sort by land use' },
    { value: 'ghgEmissions', label: 'Sort by greenhouse gas emissions' },
    { value: 'waterWithdrawals', label: 'Sort by water withdrawals' },
    { value: 'eutrophyingEmissions', label: 'Sort by eutrophying emissions' },
  ];
  const [sortBy, setSortBy] = useState(
    sortByOptions.find((option) => option.value === query.sortBy) || sortByOptions[0]
  );

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: 20,
      padding: '0 5px',
    }),
  };

  return (
    <div className="filters">
      <div className="select-container user-select">
        <Select
          value={userFilter}
          placeholder="All users"
          onChange={(val) => {
            setUserFilter(val);
            Router.push({
              pathname: '/meals',
              query: { user: val.value, sortBy: sortBy.value },
            });
          }}
          options={userFilterOptions}
          styles={customStyles}
          instanceId="user"
        />
      </div>
      <div className="select-container sort-select">
        <Select
          value={sortBy}
          placeholder="Sort by"
          onChange={(val) => {
            setSortBy(val);
            Router.push({
              pathname: '/meals',
              query: { sortBy: val.value, user: userFilter.value },
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
          justify-content: space-between;
          font-size: 14px;
        }
        .select-container {
          width: 260px;
          margin: 0 20px;
        }
      `}</style>
    </div>
  );
};

export default Filters;

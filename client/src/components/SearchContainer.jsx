import { FormRow, FormRowSelect } from '.';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useGlobalContext } from "../context/AppContext";
import { useState, useMemo } from "react";

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState('');
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    statusOptions,
    jobTypeOptions,
    handleChange,
    clearFilters,
  } = useGlobalContext();

  const handleSearch = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  }

  const debounce = () => {
    console.log('hello');
    let timeoutID;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        handleChange({ name: e.target.name, value: e.target.value });
      }, 1000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch('');
    clearFilters()
  }

  const optimizedDebounce = useMemo(() => debounce(), []);
  
  return (
    <Wrapper>
      <form className="form">
        <h4>Search form</h4>
        <div className="form-center">
          <FormRow
            type='text'
            name="search"
            value={localSearch}
            handleChange={optimizedDebounce}
          />
          {/* search by status */}
           <FormRowSelect
            labelName="job status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={['all' ,...statusOptions]}
          />
          {/* search tyoe */}
          <FormRowSelect
            labelName="type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={['all' ,...jobTypeOptions]}
          />
          {/* sort */}
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
        <button
        className="btn btn-block btn-danger"
          disabled={isLoading}
          onClick={handleSubmit}
        >
        clear filters
        </button>
        </div>
    </form>
    </Wrapper>
  )
}

export default SearchContainer

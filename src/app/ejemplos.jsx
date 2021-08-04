import React, { useEffect, useState, useRef } from 'react';

const TimeoutExample = () => {
    const [count, setCount] = useState(0);
    const countRef = useRef(count);
    countRef.current = count;
    const [countInTimeout, setCountInTimeout] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCountInTimeout(countRef.current); // count is 0 here
    }, 3000);
    setCount(5); // Update count to be 5 after timeout is scheduled
  }, []);

  return (
    <div>
      Count: {count}
      <br />
      setTimeout Count: {countInTimeout}
    </div>
  );
};

export default TimeoutExample;
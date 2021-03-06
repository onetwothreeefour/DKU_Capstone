import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

const Detail = (props) => {
  console.log('detail', props);
  const id = props.match.params.id;

  const [board, setBoard] = useState({
    id: '',
    title: '',
    content: '',
  });

  useEffect(() => {
    fetch('http://localhost:8080/board/' + id)
      .then((res) => res.json())
      .then((res) => {
        setBoard(res);
      });
  }, []);

  const deleteBoard = () => {
    fetch('http://localhost:8080/board/' + id, {
      method: 'DELETE',
    })
      .then((res) => res.text())
      .then((res) => {
        if (res === 'ok') {
          props.history.push('/');
        } else {
          alert('삭제실패');
        }
      });
  };

  const updateBoard = () => {
    props.history.push('/updateForm/' + id);
  };

  return (
    <div>
      <h1>책 상세보기</h1>
      <Button variant="warning" onClick={updateBoard}>
        수정
      </Button>
      {'  '}
      <Button variant="danger" onClick={deleteBoard}>
        삭제
      </Button>
      <hr />
      <h3>{board.content}</h3>
      <h1>{board.title}</h1>
    </div>
  );
};

export default Detail;
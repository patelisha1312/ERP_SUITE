import axios from 'axios';

const API =
  'http://localhost:5000/api/attendance';

// GET

export const getAttendance =
  async () => {

    return await axios.get(API);

  };

// MARK

export const markAttendance =
  async (data) => {

    return await axios.post(

      `${API}/mark`,

      data

    );

  };
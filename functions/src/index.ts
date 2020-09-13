import * as admin from 'firebase-admin';

admin.initializeApp();

import * as functions from 'firebase-functions';
import corsOptions from './cors-options';

const firestore = admin.firestore();
const cors = require('cors')(corsOptions);

function isDatePassed(date: string) {
  return (
    new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000 - 1) < new Date()
  );
}

export const x = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { message, isWithDueDate, dueDate } = JSON.parse(req.body);
    const id = Math.floor(Math.random() * 3 ** 16)
      .toString(3)
      .replace(/2/g, 'z')
      .replace(/1/g, 'y')
      .replace(/0/g, 'x');

    await firestore
      .collection('message')
      .doc(id)
      .set({ message, id, isWithDueDate, dueDate });

    res.send(JSON.stringify({ success: true, id }));
  });
});

export const y = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const id = req.query.z as string;

    const doc = await firestore.collection('message').doc(id).get();
    await doc.ref.delete();

    const data = doc.data();

    if (!data) {
      res.send(JSON.stringify({ xyz: '' }));
      return;
    }

    if (data.isWithDueDate && isDatePassed(data.dueDate)) {
      res.send(JSON.stringify({ xyz: '' }));
      return;
    }

    res.send(JSON.stringify({ xyz: doc.data()?.message }));
  });
});

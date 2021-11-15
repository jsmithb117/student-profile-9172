import {rest} from 'msw';
import {setupServer} from 'msw/node'
import { render, screen } from '@testing-library/react';
import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from './App';
import Score from './components/Score';

const testData = {
  students: [{
  "city": "TestCity",
  "company": "TestCompany",
  "email": "Testemail@email.email",
  "firstName": "TestFirstName",
  "grades": ["42", "86", "64"],
  "id": "0",
  "lastName": "TestLastName",
  "pic": "https://storage.googleapis.com/hatchways-app.appspot.com/assessments/data/frontend/images/voluptasdictablanditiis.jpg",
  "skill": "TestSkill",
  tags: ["testTag1", "testTag2"],
}]};


const mockServer = setupServer(
  rest.get('/test', (req, res, ctx) => res(ctx.json(testData)))
);

beforeAll(() => mockServer.listen());
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

test('renders "Search by name" form', () => {
  const { queryByPlaceholderText } = render(<App url={ '/test' } />);
  const form = queryByPlaceholderText(/Search by name/i)
  expect(form).toBeDefined();
});

test('renders "Search by Tag" form', () => {
  const { queryByPlaceholderText } = render(<App url={ '/test' } />);
  const form = queryByPlaceholderText(/Search by tag/i)
  expect(form).toBeDefined();
});

test('renders name in all caps', () => {
  const { queryByText } = render(<App url={ '/test' } />);
  const upperCase = queryByText(/TESTFIRSTNAME TESTLASTNAME/);
  expect(upperCase).toBeDefined()
});

test('renders email in format given', () => {
  const { queryByText } = render(<App url={ '/test' } />);
  const email = queryByText(/Testemail/);
  expect(email).toBeDefined();
});

test('renders company name in format given', () => {
  const { queryByLabelText } = render(<App url={ '/test' } />);
  const company = queryByLabelText(/TestCompany/i);
  expect(company).toBeDefined();
});

test('renders skill in format given', () => {
  const { queryByLabelText } = render(<App url={ '/test' } />);
  const skill = queryByLabelText(/TestSkill/i);
  expect(skill).toBeDefined();
});

test('renders average in proper format', () => {
  const {queryByText, findByText} = render(<App url={ '/test' } />);
  const averageParent = queryByText(/64%/);

  expect(averageParent).toBeDefined();
});

test('filters list when an entry is made in "Search by name" form and no entry is made in "Search by tag form', async () => {
  const { queryByText, queryByPlaceholderText, findAllByText } = render(<App url={ '/test' } />);
  const upperCase1 = await findAllByText(/TESTFIRSTNAME TESTLASTNAME/);
  expect(upperCase1.length).toBe(1);

  userEvent.type(queryByPlaceholderText('Search by name'), 'test');
  const upperCase2 = queryByText(/TESTFIRSTNAME TESTLASTNAME/);
  expect(upperCase2).toBeDefined();

  userEvent.type(queryByPlaceholderText('Search by name'), 'notOnThePage');
  const upperCase3 = queryByText(/TESTFIRSTNAME TESTLASTNAME/);
  expect(upperCase3).toBe(null);
});

test('filters list when an entry is made in "Search by tag" form and no entry is made in "Search by name form', async () => {
  const { queryByText, findByText, queryByPlaceholderText } = render(<App url={ '/test' } />);
  const upperCase1 = await findByText(/TESTFIRSTNAME TESTLASTNAME/);
  expect(upperCase1).toBeDefined();

  userEvent.type(queryByPlaceholderText('Search by tag'), 'testTag');
  const upperCase2 = queryByText(/TESTFIRSTNAME TESTLASTNAME/);
  expect(upperCase2).toBeDefined();

  userEvent.type(queryByPlaceholderText('Search by tag'), 'notATag');
  const upperCase3 = queryByText(/TESTFIRSTNAME TESTLASTNAME/);
  expect(upperCase3).toBe(null);
});

test('filters list when an entry is made in "Search by name" form and an entry is made in "Search by tag" form', async () => {
  const { queryByText, findByText, queryByPlaceholderText } = render(<App url={ '/test' } />);
  const upperCase1 = await findByText(/TESTFIRSTNAME TESTLASTNAME/);
  expect(upperCase1).toBeDefined();

  userEvent.type(queryByPlaceholderText('Search by name'), 'test');
  userEvent.type(queryByPlaceholderText('Search by tag'), 'tag1');
  const upperCase2 = queryByText(/TESTFIRSTNAME TESTLASTNAME/);
  expect(upperCase2).toBeDefined();

  userEvent.type(queryByPlaceholderText('Search by name'), 'test');
  userEvent.type(queryByPlaceholderText('Search by tag'), 'notATag');
  const upperCase3 = queryByText(/TESTFIRSTNAME TESTLASTNAME/);
  expect(upperCase3).toBe(null);

  userEvent.type(queryByPlaceholderText('Search by name'), 'wrongName');
  userEvent.type(queryByPlaceholderText('Search by tag'), 'tag');
  const upperCase4 = queryByText(/TESTFIRSTNAME TESTLASTNAME/);
  expect(upperCase4).toBe(null);
});

test('renders tags', async () => {
  const { findByText } = render(<App url={ '/test' } />);
  const existingTag = await findByText(/tag1/);
  expect(existingTag).toBeDefined();
})

test('adds a tag to a user when a unique tag is made in "Add a tag" form', async () => {
  const { queryByPlaceholderText, queryAllByText, findAllByText } = render(<App url={ '/test' } />);
  const existingTag = await findAllByText(/tag/);
  expect(existingTag.length).toBe(2);

  userEvent.type(queryByPlaceholderText('Add a tag'), 'newtag{enter}');
  const newTag = queryAllByText(/newtag/);
  expect(newTag.length).toBe(1);
});

test('does not add a tag that already exists', async () => {
  const { queryByPlaceholderText, findAllByText } = render(<App url={ '/test' } />);
  const existingTag = await findAllByText(/tag1/);
  expect(existingTag.length).toBe(1);

  userEvent.type(queryByPlaceholderText('Add a tag'), 'tag1{enter}');
  const newTags = await findAllByText(/tag1/);
  expect(newTags.length).toBe(1);
});

test('expands scores when "+" button is clicked and collapses scores when "-" button is clicked', () => {
  const { queryByText, queryAllByText } = render(<App url={ '/test' } />);
  userEvent.click(queryByText('+'));
  const tests1 = queryAllByText(/%/);
  expect(tests1.length).toBe(3);

  userEvent.click(queryByText('-'));
  const tests2 = queryAllByText(/%/);
  expect(tests2.length).toBe(1);
});
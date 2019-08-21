const { gql } = require("apollo-server-express");

// The GraphQL schema
const typeDefs = gql`
  type Query {
    assays: [Assay!]!
    projects: [Project!]!
    project(id: ID!): Project!
    samplesheets: [Samplesheet!]!
    users: [User!]!
    login(username: String!, password: String!): AuthData!
  }

  type Mutation {
    createProject(projectInput: ProjectInput!): Project!
    createUser(userInput: UserInput): User
    createSamplesheet(samplesheetInput: SamplesheetInput): Samplesheet!
    updateProject(projectId: ID!, description: String, contacts: [ID!]): Project
  }

  input ProjectInput {
    created: String
    author: ID!
    name: String!
    description: String!
    contacts: [ID!]!
  }

  input SamplesheetInput {
    created: String
    fullname: String!
    author: ID!
    project_id: ID!
    sequencer: String!
    run: String!
    flowcell: String
    iemfileversion: String!
    date: String!
    workflow: String!
    application: String!
    description: String
    chemistry: String!
    reads1: String!
    reads2: String!
    adapter1: String!
    adapter2: String!
    samples: [SampleInput!]
  }

  input SampleInput {
    lane: String
    number: String!
    library: String!
    index1: String!
    index2: String
    description: String
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type AuthData {
    token: String!
  }

  type Samplesheet {
    _id: ID!
    created: String!
    fullname: String!
    author: ID!
    project_id: ID!
    sequencer: String!
    run: String!
    flowcell: String
    iemfileversion: String!
    date: String!
    workflow: String!
    application: String!
    description: String
    chemistry: String!
    reads1: String!
    reads2: String!
    adapter1: String!
    adapter2: String!
    samples: [Sample!]!
  }

  type Sample {
    _id: ID!
    lane: String
    number: String!
    library: String!
    index1: String!
    index2: String
    description: String
  }

  type Project {
    _id: ID!
    created: String!
    author: User!
    name: String!
    description: String!
    contacts: [User!]!
  }

  type DoubleIndex {
    i7indexes: [Indexes!]
    i5indexes: [I5Indexes!]
  }

  type Indexes {
    name: String!
    bases: String!
  }

  type I5Indexes {
    name: String!
    novabases: String!
    nextbases: String!
  }

  type QIIndexes {
    name: String!
    i7bases: String!
    i5novabases: String!
    i5nextbases: String!
  }

  type Assay {
    _id: ID!
    assay: String!
    name_shortcut: String
    adapter: String
    adapter1: String
    adapter2: String
    singleIndex: [Indexes!]
    doubleIndex: DoubleIndex
    uniqueDI: [QIIndexes!]
  }
`;

module.exports = { typeDefs };

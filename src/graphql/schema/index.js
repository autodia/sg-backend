const { gql } = require("apollo-server-express");

const {
  GraphQLDateTime
} = require('graphql-iso-date');

const resolveFunctions = {
  DateTime: GraphQLDateTime
};

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
    createUser(userInput: UserInput!): User
    createSamplesheet(samplesheetInput: SamplesheetInput): Samplesheet!
    createSamples(samplesInput: [SampleInput!]): [Sample!]
    updateProject(projectId: ID!, description: String, contacts: [ID!]): Project
  }

  scalar DateTime

  type Project {
    _id: ID!
    created: DateTime!
    author: User!
    name: String!
    description: String!
    contacts: [User!]!
  }

  input ProjectInput {
    author: ID!
    name: String!
    description: String!
    contacts: [ID!]!
  }

  type Samplesheet {
    _id: ID!
    created: DateTime!
    fullname: String!
    author: User!
    project: Project!
    sequencer: String!
    run: String!
    flowcell: String
    iemfileversion: String!
    date: String!
    workflow: String!
    application: String!
    assay: String!
    description: String
    chemistry: String!
    reads1: String!
    reads2: String!
    adapter1: String!
    adapter2: String!
    samples: [Sample!]!
  }


  input SamplesheetInput {
    fullname: String!
    author: ID!
    sequencer: String!
    run: String!
    flowcell: String
    iemfileversion: String!
    date: String!
    workflow: String!
    application: String!
    assay: String
    description: String
    chemistry: String!
    reads: String!
    umi: String!
    adapter1: String!
    adapter2: String!
  }

  type Sample {
    _id: ID!
    lane: Int
    project: ID!
    number: String!
    library: String!
    index1: String!
    index2: String
    description: String
  }

  input SampleInput {
    samplesheet: ID!,
    lane: Int
    number: String!
    type: String!
    library: String!
    index1: String!
    index2: String
    description: String
  }

  input UserInput {
    username: String!
    email: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type AuthData {
    token: String!
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

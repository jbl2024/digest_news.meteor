import SimpleSchema from "simpl-schema";

export default new SimpleSchema({
  /* relations */
  userId: {
    type: String
  },

  /* main attributes */
  title: String,
  url: String,
  deleted: {
    type: Boolean,
    defaultValue: false
  },

  metadata: {
    type: Object,
    optional: true
  },

  "metadata.color": {
    type: Array,
    optional: true
  },

  "metadata.color.$": {
    type: String
  },

  "metadata.excerpt": {
    type: String,
    optional: true
  },
  "metadata.content": {
    type: String,
    optional: true
  },
  "metadata.keywords": {
    type: Array,
    optional: true
  },

  "metadata.keywords.$": {
    type: String
  },
  "metadata.imageUrl": {
    type: String,
    optional: true
  },

  "metadata.thumbnail": {
    type: String,
    optional: true
  },

  /* dates */
  createdAt: Date,
  updatedAt: Date,
  createdBy: String,
  updatedBy: String
});

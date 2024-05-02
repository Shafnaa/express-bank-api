import { celebrate } from "celebrate";

const celebrateWrappers = (schema: any) =>
  celebrate(schema, { abortEarly: false });

export default celebrateWrappers;

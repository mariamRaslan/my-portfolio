import Empty, { EmptyProps } from "@/components/Empty";
import { getServerPrivateData } from "@/config/server-fetch";
import get from "lodash/get";
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { ReactNode } from "react";
import { getPublicData } from "./client-fetch";
import { IGetDataOptions } from "@/types/general.types";

const MappingFun = async ({
  queryKey,
  render,
  arraypath,
  errorComponent,
  emptyProps,
  errorProps = { header: "حدث خطأ" },
  returnEmptyState = false,
  requireAuth = true,
  endPointOptions,
}: {
  queryKey: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (data: any) => ReactNode;
  arraypath: string;
  errorComponent?: ReactNode;
  emptyProps?: EmptyProps;
  errorProps?: EmptyProps;
  returnEmptyState?: boolean;
  requireAuth?: boolean;
  endPointOptions?: Partial<IGetDataOptions>;
}) => {
  try {
    let fetchedData;

    // console.log("🚀 ~ MappingFun ~ queryKey:", queryKey);

    if (requireAuth) {
      fetchedData = await getServerPrivateData({
        queryKey: [queryKey],
        ...endPointOptions,
      });
      // fetchedData = await getData({ queryKey: [queryKey], ...endPointOptions });
    } else {
      fetchedData = await getPublicData({
        queryKey: [queryKey],
        ...endPointOptions,
      });
    }

    // console.log("🚀 ~ MappingFun ~ data:", queryKey, fetchedData);

    const targetArray = get(fetchedData, arraypath, []);

    if (
      !fetchedData ||
      (Array.isArray(targetArray) && !targetArray.length) ||
      !targetArray
    )
      return returnEmptyState
        ? null
        : errorComponent || <Empty {...emptyProps} />;

    return <>{fetchedData && render(fetchedData)}</>;
  } catch (e) {
    console.log("🚀 ~ MappingFun ~ error: ", queryKey, e);
    if (isRedirectError(e) || isDynamicServerError(e)) throw e;

    return returnEmptyState
      ? null
      : errorComponent || <Empty {...errorProps} />;
  }
};

export default MappingFun;

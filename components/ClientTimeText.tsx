"use client";

import React, { useEffect, useState } from "react";
import { format as formatDate, parseISO } from "date-fns";

// Define the type for the component props
interface ClientTimeTextProps {
  ISOstring: string;
  format: string;
}

// Functional component with destructured props
const ClientTimeText: React.FC<ClientTimeTextProps> = ({
  ISOstring,
  format,
}) => {
  const [dateString, setDateString] = useState(
    formatDate(parseISO(ISOstring), format)
  );

  useEffect(() => {
    setDateString(formatDate(parseISO(ISOstring), format));
  }, [ISOstring]);

  return <>{dateString}</>;
};

export default ClientTimeText;

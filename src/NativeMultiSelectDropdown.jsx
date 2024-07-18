/* eslint-disable sort-imports */
import { createElement, useState, useEffect } from "react";

import { NativeElementMutliSelectDropdown } from "./components/NativeElementMutliSelectDropdown";

export function NativeMultiSelectDropdown({
    style,
    selectedValue,
    datasourceEvents,
    label,
    value,
    rightlogo,
    searchFun,
    autoScroll,
    PlaceHolder,
    onSelect,
    showRightLogo,
    leftlogo,
    showLeftLogo,
    searchPlaceHolder
}) {
    const [hasValue, setHasValue] = useState([]);

    useEffect(() => {
        const updateHasValue = () => {
            if (selectedValue?.status === "available") {
                const valueToCheck = selectedValue.value || "";
                const hasValues =
                    typeof valueToCheck === "string" && valueToCheck.includes(",")
                        ? valueToCheck.split(",").map(item => item.trim())
                        : valueToCheck
                        ? [valueToCheck]
                        : [];

                setHasValue(hasValues);
                console.warn("values", hasValues);
            } else {
                setHasValue([]);
            }
        };

        updateHasValue();
    }, [selectedValue]);

    const dropdownData =
        datasourceEvents && datasourceEvents.items
            ? datasourceEvents.items.map(item => {
                  const setLabel = label.get(item).value;
                  const setValue = value.get(item).value;
                  return {
                      label: setLabel,
                      value: setValue
                  };
              })
            : [];

    return (
        <NativeElementMutliSelectDropdown
            style={style}
            selectedValue={selectedValue}
            dropdownData={dropdownData}
            rightlogo={rightlogo}
            searchFun={searchFun}
            autoScroll={autoScroll}
            PlaceHolder={PlaceHolder}
            onSelect={onSelect}
            showRightLogo={showRightLogo}
            leftlogo={leftlogo}
            showLeftLogo={showLeftLogo}
            searchPlaceHolder={searchPlaceHolder}
            hasValue={hasValue}
        />
    );
}

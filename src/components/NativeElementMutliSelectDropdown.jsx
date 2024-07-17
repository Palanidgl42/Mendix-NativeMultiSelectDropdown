/* eslint-disable sort-imports */
import { createElement, useState, useEffect } from "react";
import { Text, View } from "react-native";

import { mergeNativeStyles } from "@mendix/pluggable-widgets-tools";

import { MultiSelect } from "react-native-element-dropdown";

import { SvgXml } from "react-native-svg";

const defaultStyle = {
    container: { padding: 16 },
    dropdown: {
        height: 50,
        backgroundColor: "white",
        borderRadius: 6,
        padding: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2
    },
    placeholderStyle: {
        fontSize: 16,
        marginLeft: 10
    },
    selectedTextStyle: {
        fontSize: 14,
        marginLeft: 10
    },
    iconStyle: {
        width: 20,
        height: 20
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16
    },
    selectedStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 6,
        backgroundColor: "white",
        shadowColor: "#000",
        marginTop: 8,
        marginRight: 12,
        // paddingHorizontal: 12,
        // paddingVertical: 8,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2
    }
};

export function NativeElementMutliSelectDropdown({
    selectedValue,
    style,
    dropdownData,
    rightlogo,
    searchFun,
    autoScroll,
    PlaceHolder,
    onSelect,
    showRightLogo,
    showLeftLogo,
    leftlogo,
    searchPlaceHolder
}) {
    const styles = mergeNativeStyles(defaultStyle, style);

    const [value, setValue] = useState([]);

    const renderRightIcon = () => {
        if (showRightLogo === "yes") {
            return <SvgXml xml={rightlogo.value} width={20} height={20} />;
        }
        return null;
    };
    const renderLeftIcon = () => {
        if (showLeftLogo === "yes") {
            return <SvgXml xml={leftlogo.value} width={20} height={20} />;
        }
        return null;
    };

    const handleChange = items => {
        setValue(items);
        const selectedLabels = items.map(item => item).join(", ");
        selectedValue.setValue(selectedLabels);
        if (onSelect) {
            onSelect.execute();
        }
    };

    return (
        <View style={styles.container}>
            <MultiSelect
                style={[styles.dropdown]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={dropdownData}
                search={searchFun === "yes"}
                autoScroll={autoScroll === "yes"}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={PlaceHolder ? PlaceHolder : ""}
                searchPlaceholder={searchPlaceHolder ? searchPlaceHolder : "Search..."}
                value={value}
                onChange={handleChange}
                renderRightIcon={renderRightIcon}
                renderLeftIcon={renderLeftIcon}
                selectedStyle={styles.selectedStyle}
            />
        </View>
    );
}

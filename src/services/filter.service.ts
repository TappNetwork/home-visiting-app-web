const FilterService = {
    searchFilter: function (services: [], value: string, fields: string[]) {
        if (!value) return services;

        return services.filter((service: any) => {
            for (const field of fields) {
                if (service[field]?.toLowerCase().includes(value)) {
                    return true;
                }
            }

            return false;
        });
    },

    arrayValueFilter: function (services: [], field: string, value: string) {
        if (!value) return services;

        return services.filter((service: any) => {
            return service[field].includes(value);
        });
    },

    stringValueFilter: function (services: [], field: string, value: string) {
        if (!value) return services;

        return services.filter((service: any) => {
            return service[field] == value;
        });
    },

    pushArrayValueIfNotExisting: function (hayStack: string[], needleStack: string) {
        for (const needle of needleStack) {
            if (! hayStack.includes(needle)) {
                hayStack.push(needle);
            }
        }
    },

    pushStringValueIfNotExisting: function (hayStack: string[], needle: string) {
        if (! hayStack.includes(needle)) {
            hayStack.push(needle);
        }
    }
}

export default FilterService;
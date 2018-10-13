/* @flow */

export default {
    client(labelClient: string, labelSSR: string): Promise<{ renderTreeFormed: number, fmp: number, label: string }> {
        window.reactFMP = window.reactFMP || {};
        window.reactFMP.metrics = window.reactFMP.metrics || [];

        const metrics = window.reactFMP.metrics;

        return new Promise((resolve) => {
            const SSRMetric = metrics.find((item) => item.label === labelSSR);
            if (metrics.length !== 0 && SSRMetric) {
                resolve(SSRMetric);
            }

            requestAnimationFrame(() => {
                const renderTreeFormed = performance.now();
                requestAnimationFrame(() => {
                    const fmp = performance.now();
                    const metric = {
                        renderTreeFormed: renderTreeFormed,
                        fmp: fmp,
                        label: labelClient,
                    };

                    window.reactFMP.metrics.push(metric);
                    resolve(metric);
                });
            });
        });
    },
    getInlineScript(label: string) {
        return `
            window.reactFMP = window.reactFMP || {};
            window.reactFMP.metrics = window.reactFMP.metrics || [];
        
            requestAnimationFrame(function() {
                var renderTreeFormed = performance.now();
                requestAnimationFrame(function() {
                    var fmp = performance.now();
                    window.reactFMP.metrics.push({
                        renderTreeFormed: renderTreeFormed,
                        fmp: fmp,
                        label: "${label}",
                    })
                });
            });
        `;
    },
};

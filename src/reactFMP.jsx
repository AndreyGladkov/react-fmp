/* @flow */

import React, { Fragment, Component } from 'react';
import type { Node } from 'react';
import calculateMetrics from './calculateMetrics';

type Props = {
    labelClient: string,
    labelSSR: string,
    serverENV: boolean,
    children: Node,
    send: Function,
};

export default class FirstMeaningfulPaint extends Component<Props> {
    componentDidMount() {
        const { labelClient, labelSSR, send } = this.props;
        calculateMetrics.client(labelClient, labelSSR).then((metric) => send(metric));
    }

    render() {
        const { serverENV, children, labelSSR } = this.props;

        return (
            <Fragment>
                <script
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{
                        __html: serverENV ? calculateMetrics.getInlineScript(labelSSR) : '',
                    }}
                />
                {children}
            </Fragment>
        );
    }
}

import { IFileSystemAPI } from "../../../interface";
import { initShaderProgram } from "../shader";

import vertexURL from "./source/square-vertex.glsl?url";
import fragmentURL from "./source/square-fragment.glsl?url";

// TODO: Convert all Array<number> operations here to
// Float32Array operations.

namespace SquareShader {
    export interface Data {
        program: WebGLProgram;

        attribLocations: {
            vertexPosition: GLint;
        };

        uniformLocations: {
            position: WebGLUniformLocation;
            scale: WebGLUniformLocation;
            color: WebGLUniformLocation;
        };

        positionBuffer: WebGLBuffer;
    }

    export const setPositionAttribute = (
        gl: WebGLRenderingContext,
        data: Data,
        positionBuffer: WebGLBuffer
    ) => {
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        gl.vertexAttribPointer(
            data.attribLocations.vertexPosition,
            3,
            gl.FLOAT,
            false,
            0,
            0
        );

        gl.enableVertexAttribArray(data.attribLocations.vertexPosition);
    };

    export const getData = (
        gl: WebGLRenderingContext,
        program: WebGLProgram
    ): Data => {
        const positionLoc = gl.getUniformLocation(program, "uPosition");

        if (!positionLoc) {
            throw Error(`Could not find uniform location\
            for uPosition`);
        }

        const scaleLoc = gl.getUniformLocation(program, "uScale");

        if (!scaleLoc) {
            throw Error(`Could not find uniform location\
            for uScale`);
        }

        const colorLoc = gl.getUniformLocation(program, "uColor");

        if (!colorLoc) {
            throw Error(`Could not find uniform location\
            for uColor`);
        }

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([
                -1, -1, 0, -1, 1, 0, 1, 1, 0, 1, 1, 0, 1, -1, 0, -1, -1, 0,
            ]),
            gl.STATIC_DRAW
        );

        return {
            program: program,
            attribLocations: {
                vertexPosition: gl.getAttribLocation(
                    program,
                    "aVertexPosition"
                ),
            },
            uniformLocations: {
                position: positionLoc,
                scale: scaleLoc,
                color: colorLoc,
            },
            positionBuffer: positionBuffer,
        };
    };

    export const initialise = async (
        gl: WebGLRenderingContext,
        fs: IFileSystemAPI
    ): Promise<Data> => {
        const program = await initShaderProgram(gl, vertexURL, fragmentURL, fs);

        if (program == null) {
            throw Error(
                `Exiting. H-Sharp was unable to initialise the waveform shader program.`
            );
        }

        return getData(gl, program);
    };
}

export { SquareShader };

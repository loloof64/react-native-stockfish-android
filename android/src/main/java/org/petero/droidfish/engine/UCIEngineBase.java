/*
    DroidFish - An Android chess program.
    Copyright (C) 2011-2012  Peter Österlund, peterosterlund2@gmail.com

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

package org.petero.droidfish.engine;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.HashSet;

import org.petero.droidfish.EngineOptions;

import android.content.Context;

public abstract class UCIEngineBase implements UCIEngine {

    private boolean processAlive;
    private HashSet<String> allOptions;
    private HashMap<String, String> currOptions;
    protected boolean isUCI;

    public static UCIEngine getEngine(Context context, String engine, Report report) {
        return new InternalStockFish(context, report);
    }

    protected UCIEngineBase() {
        processAlive = false;
        allOptions = new HashSet<String>();
        currOptions = new HashMap<String, String>();
        isUCI = false;
    }

    protected abstract void startProcess();

    @Override
    public final void initialize() {
        if (!processAlive) {
            startProcess();
            processAlive = true;
        }
    }

    @Override
    public void initOptions(EngineOptions engineOptions) {
        isUCI = true;
    }

    @Override
    public void shutDown() {
        if (processAlive) {
            writeLineToEngine("quit");
            processAlive = false;
        }
    }

    @Override
    public void clearOptions() {
        allOptions.clear();
    }

    @Override
    public void registerOption(String optName) {
        allOptions.add(optName);
    }

    /** Return true if engine has option optName. */
    protected boolean haveOption(String optName) {
        return allOptions.contains(optName);
    }

    @Override
    public void setOption(String name, int value) {
        setOption(name, String.format("%d", value));
    }

    @Override
    public void setOption(String name, boolean value) {
        setOption(name, value ? "true" : "false");
    }

    @Override
    public void setOption(String name, String value) {
        String lcName = name.toLowerCase();
        if (!allOptions.contains(lcName))
            return;
        String currVal = currOptions.get(lcName);
        if (value.equals(currVal))
            return;
        writeLineToEngine(String.format("setoption name %s value %s", name, value));
        currOptions.put(lcName, value);
    }
}
